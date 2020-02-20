
const include = (file: string) => import(/* webpackChunkName:'grounpTest' */ `@/views/${file}.vue`);

export default include;
