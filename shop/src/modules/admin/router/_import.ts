
const include = (file: string) => import(/* webpackChunkName:'grounpTest' */ `@/modules/admin/views/${file}.vue`);

export default include;
