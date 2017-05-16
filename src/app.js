import Rx from 'rxjs/Rx';

console.log('RxJS Boiler Running...');

//Observable from events

const btn = document.getElementById('btn');
const input = document.getElementById('input');
const output = document.getElementById('output');

const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

btnStream$.take(3).subscribe(
	e => console.log('clicked', e),
	console.log,
	(...args) => console.log('completed', args));

btnStream$.take(5).subscribe(
	e => console.log('clicked', e),
	console.log,
	(...args) => console.log('completed', args));

const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');

inputStream$.debounceTime(800).subscribe(
	e => {
		output.innerHTML = e.target.value
	},
	console.log,
	(...args) => console.log('completed', args));

//Observable from arrays

const numbers = [33, 44, 55, 66, 77];
const numbers$ = Rx.Observable.from(numbers);

numbers$.map(e => {
	console.log('e');
	return e*2;
}).subscribe(
	console.log,
	console.log,
	() => console.log('completed')
	);

const posts = [
	{title: 'Post One', body: 'This is the body'},
	{title: 'Post Two', body: 'This is the body'},
	{title: 'Post three', body: 'This is the body'}
];

const posts$ = Rx.Observable.from(posts);

posts$.subscribe(
	post => {
		const li = document.createElement('li');
		const h3 = document.createElement('h3');
		const p = document.createElement('p');
		const h3Text = document.createTextNode(post.title);
		const pText = document.createTextNode(post.body);
		h3.appendChild(h3Text);
		p.appendChild(pText);
		li.appendChild(h3);
		li.appendChild(p);
		document.getElementById('posts').appendChild(li);
	},
	console.log,
	() => console.log('completed'));

let myObserver;
const source$ = new Rx.Observable(observer => {myObserver = observer;});

source$.subscribe(
	console.log,
	console.log,
	() => console.log('source$ completed'));

setTimeout(() => {
	myObserver.next('Hello from timeout');
}, 5000);


const interval$ = Rx.Observable.interval(100).take(6);

interval$.subscribe(
	console.log,
	console.log,
	()=>{console.log('completed')});

const timer$ = Rx.Observable.timer(5000, 500).take(5);

timer$.subscribe(
	console.log,
	console.log,
	()=>{console.log('completed')});




const users = [
	{name: 'Josue', age: 27},
	{name: 'Eli', age: 21}
];

const users$ = Rx.Observable.from(users).pluck('name');

users$.subscribe(console.log);


Rx.Observable.interval(2000)
	.merge(Rx.Observable.interval(500))
	.take(5)
	.subscribe(console.log);


const merge1$ = Rx.Observable.interval(2000).map(v => 'Merge 1: '+v);
const merge2$ = Rx.Observable.interval(500).map(v => 'Merge 2: '+v);

Rx.Observable.merge(merge1$, merge2$)
	.take(5)
	.subscribe(console.log);


const flatMapEx = Rx.Observable
    .range(1, 2)
    .mergeMap(e => { //same as flatMap
    	console.log(e);
    	return Rx.Observable.range(e, 2);
    });
const switchMapEx = Rx.Observable
    .range(1, 2)
    .mergeMap(e => { //same as flatMap
    	console.log(e);
    	return Rx.Observable.range(e, 2);
    });

const subscriptionm = flatMapEx.subscribe(
    function (x) { console.log('mNext: ' + x); },
    function (err) { console.log('mError: ' + err); },
    function () { console.log('mCompleted'); });

const subscriptions = switchMapEx.subscribe(
    function (x) { console.log('sNext: ' + x); },
    function (err) { console.log('sError: ' + err); },
    function () { console.log('sCompleted'); });

const outerm = Rx.Observable.interval(1000).take(2);

const sourcem = outerm.mergeMap(function (x) {
  return Rx.Observable.interval(500).take(3).map(y => `merge ${x}:${y}`)
});

sourcem.subscribe(d => console.log(d));

setTimeout(function() {
	const outers = Rx.Observable.interval(1000).take(2);

	const sources = outers.switchMap(function (x) {
	  return Rx.Observable.interval(500).take(3).map(y => `switch ${x}:${y}`)
	});

	sources.subscribe(d => console.log(d));
}, 6000);

