export const prototyping = () => {
  Date.prototype.toString = function () {
    return this.toISOString();
  };
};
