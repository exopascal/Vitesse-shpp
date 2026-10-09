const videoMap: Record<string, string[]> = {
  'tunturi-platinum-c20': [
    '/tunturi-platinum-c20-video.mov',
    '/tunturi-platinum-c20-video-high.mov',
    '/tunturi-platinum-c20-widerstand-video.mov',
  ],
  'tunturi-platinum-e30': [
    '/tunturi-platinum-e30-video.mov',
  ],
  'tunturi-platinum-s20': [
    '/tunturi-platinum-s20-video.mov',
    '/tunturi-platinum-s20-video-high.mov',
    '/tunturi-platinum-s20-widerstand-video.mov',
    '/tunturi-platinum-s20-klickpedale-video.mov',
  ],
  'tunturi-platinum-t20': [
    '/tunturi-platinum-t20-video.mov',
    '/tunturi-platinum-t20-video-high.mov',
    '/tunturi-platinum-t20-incline-video.mov',
    '/tunturi-platinum-t20-widerstand-video.mov',
  ],
  'tunturi-platinum-t30': [
    '/tunturi-platinum-t30-video.mov',
    '/tunturi-platinum-t30-video-high.mov',
  ],
  't-apex': [
    '/T-Apex-1080motion-seilzugtraining.mov',
  ],
}

export function getProductVideos(handle: string): string[] {
  const videos = videoMap[handle] ?? []
  return [...videos].sort((a, b) => a.length - b.length)
}
