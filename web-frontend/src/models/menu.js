export default {

  namespace: 'menu',

  state: {
    main: {
      currentKey: 'main_nav_home',
      mode: 'horizontal',
      pages: [
        {
          name: 'main_nav_home',
          title: 'app.header.menu.home',
          path: '/'
        },
        {
          name: 'main_nav_signin',
          title: 'app.header.menu.signin',
          path: '/signin',
          permissions: ['guest']
        }
      ]
    }
  },

  subscriptions: {},

  effects: {},

  reducers: {
    active(state, action) {
      let menuName = action.payload.menu;

      let menuObj = Object.assign({}, state[menuName]);
      menuObj.currentKey = action.payload.key;
      return {...state, [menuName]: menuObj};
    }
  }
}
