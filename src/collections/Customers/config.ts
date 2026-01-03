import { CollectionConfig } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    tokenExpiration: 12 * 60 * 60, // 12 hours,
    verify: {
      generateEmailSubject: (args) => {
        return `Bonjour ${args.user.firstName ? args.user.firstName : args.user.email}, vérifiez votre adresse email`
      },
      generateEmailHTML: (args) => {
        return `<div><h1>Bonjour ${args.user.firstName ? args.user.firstName : args.user.email}!, vérifiez votre adresse email</h1>
        <br />
        <p>Vérifiez votre adresse email en cliquant sur le lien suivant: ${getServerSideURL()}/verify?token=${args.token}</p>
        </div>`
      },
    },
    forgotPassword: {
      generateEmailSubject: (args) => {
        return `Bonjour ${args?.user.firstName ? args?.user.firstName : args?.user.email}, re-initialisez votre mot de passe`
      },
      generateEmailHTML: (args) => {
        return `<div><h1>Bonjour ${args?.user.firstName ? args?.user.firstName : args?.user.email}!, re-initialisez votre mot de passe</h1>
        <br />
        <p>Vous (ou quelqu'un d'autre) avez demandé à réinitialiser votre mot de passe. Si ce n'était pas vous, vous pouvez ignorer cet e-mail en toute sécurité. 
        Sinon, réinitialisez votre mot de passe en cliquant sur le lien suivant: ${getServerSideURL()}/password-reset?token=${args?.token}</p>
        </div>`
      },
    },
    cookies: {
      secure: true,
      sameSite: 'None',
      //domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined,
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  admin: {
    useAsTitle: 'firstName',
  },
  access: {
    create: () => true,
    admin: () => false, // no access to the admin UI,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ],
    },
    {
      name: 'tier',
      type: 'radio',
      interfaceName: 'tierProps',
      options: ['Free', 'Basic', 'Pro', 'Enterprise'],
      defaultValue: 'Free',
    },
  ],
}
