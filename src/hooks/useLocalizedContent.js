import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getContentByLanguage } from '../content'

function useLocalizedContent() {
  const { i18n } = useTranslation()

  const content = useMemo(() => {
    return getContentByLanguage(i18n.language)
  }, [i18n.language])

  return content
}

export default useLocalizedContent