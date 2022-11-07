import { get } from './base'

// 获取歌曲的 url
export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  // 通过 mid 获取歌曲的 url
  return get(`/api/getSongsUrl`, {
    mid: songs.map((song) => {
      return song.mid
    }),
  }).then((result) => {
    const map = result.map
    return songs
      .map((song) => {
        song.url = map[song.mid]
        return song
      })
      .filter((song) => {
        // 过滤掉不能播放的 url
        return song.url.indexOf('vkey') > -1
      })
  })
}
