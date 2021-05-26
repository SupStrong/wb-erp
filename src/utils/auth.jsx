import Taro from "@tarojs/taro";
import { showPopup } from "@/utils/index";

let {
  userInfo: { menus },
} = Taro.$store.getState().userInfo.toJS();
let menusObj = {}
const pageConfig = [
  {
    num: 6,
    child: [
      {
        num: 1,
        icon: "iconsonghuodan",
        path: "/pages/delivery/delivery-order/lists/index",
      },
    ],
  },
];

export function menusFormate(data) {
  let obj = {};
  for (const item of data) {
    let itemObj = {
      name: item.name,
      child: {},
    };
    for (const childItem of item.child) {
      itemObj.child[childItem.num] = {
        name: childItem.name,
        roles: childItem.roles,
      };
    }
    obj[item.num] = itemObj;
  }
  menusObj = obj
  return obj
}

export function getPageList(data) {
  let rolesObj = menusFormate(data);
  let arr = [];
  for (const routerItem of pageConfig) {
    let obj = {
      name:"",
      child:[],
      num:routerItem.num
    };
    if (rolesObj.hasOwnProperty(routerItem.num)) {
      obj.name = rolesObj[routerItem.num].name;
      for (const iterator of routerItem.child) {
        if (rolesObj[routerItem.num].child.hasOwnProperty(iterator.num)) {
          obj.child.push({
            name: rolesObj[routerItem.num].child[iterator.num].name,
            icon: iterator.icon,
            path: iterator.path,
            num:iterator.num
          });
         }
      }
      arr.push(obj)
    }
  }
  return arr
}

//父集权限-子集权限-操作权限
export function checkAuth(authString){
  let arr = authString.split('-')
  if(arr.length != 3){
    showPopup('权限判断出错！')
    return false
  }
  let [patent,child,action] = arr
  return menusObj?.[patent]?.child?.[child]?.roles.includes(Number(action))
}
