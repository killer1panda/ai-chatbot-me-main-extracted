
import { onIntegrateDomain } from '@/actions/settings'
import { useToast } from '@/components/ui/use-toast'
import { AddDomainSchema } from '@/schema/settings.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UploadClient } from '@uploadcare/upload-client'
import { usePathname, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

const uploadcarePublicKey = process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY
const upload = uploadcarePublicKey
  ? new UploadClient({
      publicKey: uploadcarePublicKey,
    })
  : null

export const useDomain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof AddDomainSchema>>({
    resolver: zodResolver(AddDomainSchema),
  })

  const pathname = usePathname()
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    setIsDomain(pathname.split('/').pop())
  }, [pathname])

  const onAddDomain = handleSubmit(async (values: FieldValues) => {
    setLoading(true)
    try {
      if (!upload) {
        toast({
          title: 'Error',
          description:
            'Image upload is not configured. Set NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY.',
        })
        return
      }

      const uploaded = await upload.uploadFile(values.image[0])

      const domain = await onIntegrateDomain(values.domain, uploaded.uuid)

      if (domain) {
        reset()
        toast({
          title: domain.status == 200 ? 'Success' : 'Error',
          description: domain.message,
        })
        if (domain.status === 200) {
          router.refresh()
        }
      }
    } catch (err) {
      console.error('ERROR:', err)
    } finally {
      setLoading(false)
    }
  })

  return {
    register,
    onAddDomain,
    errors,
    loading,
    isDomain,
  }
}