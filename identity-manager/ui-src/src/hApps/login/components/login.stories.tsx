import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'
import { specs } from 'storybook-addon-specifications'
import LoginForm, { Props } from './login'
import keygenNotes from './keygen.md'
import { loginTests } from './login.test'
import CreateStore from '../../../store'

let store = CreateStore()
let props: Props = {
  title: 'Login',
  login: action('Click Create Persona')
}
storiesOf('KeyGen', module)
  .addDecorator(story => (
    <Provider store={store}><MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter></Provider>
  ))
  .add('Holo', withNotes(keygenNotes)(() => {
    specs(() => loginTests)
    return <LoginForm {...props}/>
  })
)
