
const include = (file: string) => import(/* webpackChunkName:'grounpTest' */ `@/modules/app/views/${file}.vue`);

export default include;
