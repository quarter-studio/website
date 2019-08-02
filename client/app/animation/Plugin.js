// Vendor
import defaultsDeep from 'lodash/defaultsDeep'

// Project
import database from '@/support/firebase/database.js'
import config from './config.js'
import Store from './Store.js';

const defaults = {
  config,
};
// import defaultsDeep from 'lodash/defaultsDeep'
// import includes from 'lodash/includes'
// import config from '@/store/config.js'
// import slider from './Slider.vue'
// import merge from 'lodash/merge'
// import pick from 'lodash/pick'
// import map from 'lodash/mapValues'
// import env from '@/env.js'
// import Vue from 'vue'

export default (store) => {
  store.registerModule('animation', Store);

  const add = (snap) => {
    if (snap.key !== '-LjbV2hj4bfST2vWctt-') {
      return
    }

    const config = {
      key: snap.key,
      value: defaultsDeep(snap.val(), defaults),
    };
  
    store.dispatch('animation/add', config);

    snap.ref.on('value', update);
  };

  const remove = (snap) => {
    store.dispatch('animation/remove', snap.key);

    snap.ref.off('value', update);
  };

  const update = (snap) => {
    const config = {
      key: snap.key,
      value: defaultsDeep(snap.val(), defaults),
    };

    store.commit('animation/update', config);
  }

  const model = database.ref('animation');
  model.on('child_added', add);
  model.on('child_removed', remove);
}
