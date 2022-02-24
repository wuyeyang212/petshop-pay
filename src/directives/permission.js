// import store from '@/store'
// export default {
//   inserted(el, binding) {
//     const { value } = binding
//     const roles = store.getters && store.getters.roles

//     if (value && value instanceof Array && value.length > 0) {
//       const permissionRoles = value

//       const hasPermission = roles.some(role => {
//         return permissionRoles.includes(role)
//       })

//       if (hasPermission) {
//         delete el.style.display
//       } else {
//         el.style.display = 'none'
//       }
//     } else {
//       throw new Error(`need roles! Like v-permission="['admin','editor']"`)
//     }
//   }
// }
