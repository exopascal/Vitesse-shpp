const videoMap: Record<string, string[]> = {
  'tunturi-platinum-c20-crosstrainer': [
    '/tunturi-platinum-c20-video.mov',
  ],
  'tunturi-platinum-e30-fahrradergometer': [
    '/tunturi-platinum-e30-video.mov',
  ],
  'tunturi-platinum-s20-indoor-bike': [
    '/tunturi-platinum-s20-video.mov',
  ],
  'tunturi-platinum-t20-laufband': [
    '/tunturi-platinum-t20-video.mov',
  ],
  'tunturi-platinum-t30-core-laufband': [
    '/tunturi-platinum-t30-video.mov',
  ],
  't-apex': [
    '/T-Apex-1080motion-seilzugtraining.mov',
  ],
}

export function getProductVideos(handle: string): string[] {
  const videos = videoMap[handle] ?? []
  return [...videos].sort((a, b) => a.length - b.length)
}
