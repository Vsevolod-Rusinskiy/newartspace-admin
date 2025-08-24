import { Show, SimpleShowLayout, RichTextField } from 'react-admin'

export const WelcomeModalShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <RichTextField source='content' label='Текст объявления' />
      </SimpleShowLayout>
    </Show>
  )
}
