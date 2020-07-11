import Transformer from '@transformer'
import AnilibriaReleaseEpisodeTransformer from './episode'

import stripHtml from 'string-strip-html';

export default class extends Transformer {

  /**
   * Method used to transform a fetched collection.
   *
   * @param items The items to be transformed.
   * @returns Promise The transformed items.
   */
  static async fetchCollection(items) {
    return (await Promise.allSettled((items || []).map(async item => await this.fetch(item))))
      .filter(response => response.status === 'fulfilled')
      .map(response => response.value);
  }


  /**
   * Transform incoming data
   *
   * @param release
   * @returns {{}}
   */
  static async fetch(release) {
    return {
      id: this.get(release, 'id'),
      year: this.get(release, 'year'),
      type: this.get(release, 'type'),
      code: this.get(release, 'code'),
      names: {
        ru: this._stripHtml(this.get(release, 'names.0')),
        original: this._stripHtml(this.get(release, 'names.1'))
      },
      voices: this.get(release, 'voices') || [],
      genres: this.get(release, 'genres') || [],
      poster: {
        path: this.get(release, 'poster'),
        image: null,
      },
      datetime: this._getReleaseDatetime(release),
      episodes: await AnilibriaReleaseEpisodeTransformer.fetch(release),
      description: this._stripHtml(this.get(release, 'description')),
    }
  }

  /**
   * Get release datetime
   *
   * @param release
   * @return {{system: null, human: string, timestamp: *}}
   */
  static _getReleaseDatetime(release) {

    const timestamp = this.get(release, 'last');
    const system = timestamp ? new Date(timestamp * 1000) : null;
    const human = system ? new Intl.DateTimeFormat(undefined, {}).format(system) : null;

    return {
      timestamp,
      system,
      human
    }
  }


  /**
   * Strip html tags
   *
   * @param value
   * @return {*}
   * @private
   */
  static _stripHtml(value) {
    return value ? stripHtml(value) : null;
  }
}
