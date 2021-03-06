import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { DEFAULT_AVATARS_BUCKET } from '../lib/constants'

export default function Avatar({ url, size }: { url: string | null; size: number }) {
  console.log("path:",url)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  console.log("avatarUrl:",avatarUrl)
  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from(DEFAULT_AVATARS_BUCKET).download(path)
      if (error) {
        throw error
      }
      console.log("data=>:",data)
      const url = URL.createObjectURL(data)
      console.log("url:",url)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  return avatarUrl ? (
    <img src={avatarUrl} className="avatar image" style={{ height: size, width: size }} />
  ) : (
    <div className="avatar no-image" style={{ height: size, width: size }} />
  )
}
