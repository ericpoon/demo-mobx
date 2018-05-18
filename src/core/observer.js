import autorun from './autorun';

export default function observer(target) {
  const render = target.prototype.render;
  let autorunRegistered = false;
  target.prototype.render = function () {
    if (autorunRegistered) {
      return render.apply(this, arguments);
    }

    let rendered = undefined;
    autorun(() => {
      rendered = render.apply(this, arguments);
      this.forceUpdate(); // Official MobX also uses forceUpdate()
    });
    autorunRegistered = true;
    return rendered;
  };
}
