import {
  Show,
  SimpleShowLayout,
  RichTextField,
  useShowController,
} from 'react-admin'

export const WelcomeModalShow = () => {
  const { record } = useShowController()
  const isActiveValue = record?.isActive ? 'Да' : 'Нет'

  return (
    <Show>
      <SimpleShowLayout>
        <div className='reproducible-container'>
          <span className='reproducible-label'>🔔 Активное объявление:</span>
          <span className='reproducible-value'>{isActiveValue}</span>
        </div>
        <RichTextField source='content' label='Текст объявления' />
      </SimpleShowLayout>
    </Show>
  )
}
