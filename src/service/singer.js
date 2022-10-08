import { get } from './base'

// 获取歌手信息
export function getSingerList() {
  return get('/api/getSingerList')
}
