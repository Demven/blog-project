import fetch from 'node-fetch';
import { env } from '../environments';

const GQL_URL = `${env.API_HOST}/graphql`;

export default function gql(query:string):Promise<any> {
  const isMutation = query.trim().startsWith('mutation');

  return fetch(GQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: isMutation ? ` ${query} ` : `{ ${query} }` }),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Failed to get GQL response');
    })
    .then((data:any) => {
      const result = data.data;
      const errorMessage = (data.errors && data.errors[0]?.message) || '';

      return {
        ...result,
        errorMessage,
      };
    })
    .catch(console.error);
}
