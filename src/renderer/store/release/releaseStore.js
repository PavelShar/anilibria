// Proxy
import ReleaseProxy from "@proxies/release";

// Transformers
import ReleaseTransformer from '@transformers/release'
import EpisodesTransformer from "@transformers/episode";

// Utils
import axios from "axios";

// Handlers
import {emitAppError} from "@main/handlers/notifications/notificationsHandler";

// Mutations
const SET_RELEASE_DATA = 'SET_RELEASE_DATA';
const SET_RELEASE_LOADING = 'SET_RELEASE_LOADING';

// Requests
let REQUEST = null;


export default {
  namespaced: true,
  state: {
    data: null,
    request: null,
    loading: false
  },

  mutations: {

    /**
     * Set release data
     *
     * @param s
     * @param data
     * @return {*}
     */
    [SET_RELEASE_DATA]: (s, data) => s.data = data,

    /**
     * Set loading state
     *
     * @param s
     * @param loading
     * @return {*}
     */
    [SET_RELEASE_LOADING]: (s, loading) => s.loading = loading,

  },

  actions: {


    /**
     * Get release data
     * Also get release poster
     *
     * @param commit
     * @param dispatch
     * @param state
     * @param release_id
     * @return {Promise<unknown>}
     */
    getRelease: async ({commit, dispatch, state}, release_id) => {

      // Cancel previous request if it was stored
      if (REQUEST !== null) REQUEST.cancel();

      // Reset data
      // Set loading state
      commit(SET_RELEASE_DATA, null);
      commit(SET_RELEASE_LOADING, true);

      // Save request token
      REQUEST = axios.CancelToken.source();

      try {

        // Get release data
        const data = await new ReleaseProxy().getRelease(release_id, {cancelToken: REQUEST.token});
        const release = await new ReleaseTransformer().fetchItem(data);

        // Get release poster path
        // Load release episodes
        release.poster = new ReleaseProxy().getReleasePosterPath(release.poster);
        release.episodes = await new EpisodesTransformer().fetchItem(release.episodes);

        // Save release data
        commit(SET_RELEASE_DATA, release);

      } catch (error) {
        if (!axios.isCancel(error)) {

          // Show app error
          // Throw error
          emitAppError('Произошла ошибка при загрузке релиза');
          throw error;

        }
      } finally {

        commit(SET_RELEASE_LOADING, false);

      }
    }

  }
}
