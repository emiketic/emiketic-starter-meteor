/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Lib dependencies
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';

// UI lib components
import { Layout, Form, Button, Input, message } from 'antd';

// Style
import './index.less';

// Scoped components
const { Content } = Layout;
const { Item } = Form;

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

function LoginPage() {
  /* ********************************** HOOKS ********************************* */

  const navigate = useNavigate();

  /* ***************************** LOCAL VARIABLES **************************** */

  const TranslatorComponent = i18n.createComponent(
    i18n.createTranslator('GateLayout'),
  );
  const translator = (key, args) => i18n.__('GateLayout', key, args);

  /* ******************************** CALLBACKS ******************************* */

  /**
   * Sends submitted credentials to server
   * @param {String} email User email
   * @param {String} password  User password
   */
  function onSubmitLogin({ email, password }) {
    Meteor.loginWithPassword(email, password, (e) => {
      if (e) {
        message.error(translator('LoginPage.errors.unknown'));
      } else {
        navigate('/home');
      }
    });
  }

  /* ******************************** RENDERING ******************************* */
  return (
    <Content className="gate-layout">
      <Form
        onFinish={function cb({ email, password }) {
          onSubmitLogin({ email, password });
        }}
      >
        <Item
          name="email"
          rules={[
            {
              required: true,
              message: translator('LoginPage.form.email.validation.required'),
            },
            {
              type: 'email',
              message: translator('LoginPage.form.email.validation.type'),
            },
          ]}
          required
        >
          <Input
            type="email"
            placeholder={translator('LoginPage.form.email.placeholder')}
          />
        </Item>
        <Item
          name="password"
          rules={[
            {
              required: true,
              message: translator('LoginPage.form.email.validation.required'),
            },
          ]}
        >
          <Input
            type="password"
            placeholder={translator('LoginPage.form.password.placeholder')}
          />
        </Item>
        <Item>
          <Button htmlType="submit">
            <TranslatorComponent>LoginPage.ctaLogin</TranslatorComponent>
          </Button>
        </Item>
      </Form>
    </Content>
  );
}

export default LoginPage;
