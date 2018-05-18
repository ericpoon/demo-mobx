# MobX

Implemented based on [MobX](https://github.com/mobxjs/mobx), for fun and learning purpose.

This project supports basic features of MobX including `@observable` and `autorun()`,
but also implements `@observer` in [mobx-react](https://github.com/mobxjs/mobx-react).

Comprehensive unit tests and integration tests with real react components are included.

---

The minimal working code for observable primitive values (number, string and boolean) is available at
commit `c11313d`. If you want to have a very basic idea regarding how `@observable` and `autorun()` work,
it should be a good start point. Checkout to have a look!
> It's relatively easy to understand! You may not want to start with the source code of official MobX.

### How `@observable` and `autorun()` work?

The foundamental idea is: All properties are only accessed via **getter** and only modified via **setter**.

> This can be done by `Object.defineProperty()` method.

For an *autorun function*, it runs for a single time right after we call `autorun(fn)` (`fn` is the autorun function in this case). And before `fn` is called, a global flag is set to indicating that `fn` is running and all getters called during `fn`'s execution will register `fn` in its *autorun function list*. Since we are only access a property via a getter, we know what properties are accessed during execution. And after the execution, the global flag is set to be null, so this doesn't confuse the getters whether or not it's called within a autorun function (`fn` in this case).
Up to this point, registration of a autorun function is completed. Later on, when the property is modified (via its setter), the setter will iterate through functions in *autorun function list* and hence the registered *autorun function* (`fn`) will be called.

Or in other words, here's the flow:
1. `autorun(fn)` sets a global flag indicating `fn` is about to run;
2. `autorun(fn)` executes the *autorun function* (`fn`) which may access observable properties (via getters)
3. when a getter is called, the corresponding observable property registers `fn` (indicated by the global flag) in its *autorun function list*;
4. `autorun(fn)` sets the global flag as null to indicate the end of execution, so future calls of getters will not be registered in *autorun function list*;
5. Somehow we modify an observable property (e.g. by re-assignment), its setter is called.
6. The setter iterates through the property's *autorun function list* and hence `fn` will be called.

---

As of commit `51315bd`, `@observable` and `autorun()` should work well enough to support **primitive
values, arrays and objects**. Also `@observable` automatically converts array items or object properties into observable properties in a recursive manner. 
This behaviour is the same as what official MobX library does.

---

As of commit `1ce8a9b`, we have successfully integrated this MobX with React (without `@observer`), and several examples are provided to demo how to use it.

### How to see the demo?

1. `yarn install`
2. `yarn start:demo`

---

As of commit `1c3d12f`, `@observer` annotation has been added to support the integration with React.

In my opinion, `@observer` is a syntax sugar that simplifies data binding with React.
