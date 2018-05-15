# Observable and Computed

The minimal working code for observing primitive values is available at
commit [`c11313d`](https://github.com/ericpoon/demo-mobx/commit/c11313d04cbd91afb36c2a43bbaca9770b8b2b4c). 
If you want to have a very basic idea regarding how `@observable` and `autorun()` work,
it should be a good start point.
> It's easy! Don't bother starting with the source code of official MobX.

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

As of commit [`51315bd`](https://github.com/ericpoon/demo-mobx/commit/51315bd), `@observable` and `autorun()` should work well enough to support **primitive
values, arrays and objects**. Also `@observable` automatically converts array items or object properties into observable properties in a recursive manner. 
This behaviour is the same as what official MobX library does.
