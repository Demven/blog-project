import { Injectable } from '@angular/core';
import { env } from '../../environments';

const GQL_URL = `${env.API_HOST}/graphql`;

@Injectable()
export class GQLService  {
  query (gqlQuery:string):Promise<any> {
    return fetch(GQL_URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: `{ ${gqlQuery} }` }),
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

  mutation (gqlMutation:string):Promise<any> {
    return fetch(GQL_URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: ` mutation { ${gqlMutation} }`,
      }),
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

  serializeGQLObject (object:object) {
    return JSON.stringify(object)
      .replace(/"(\w+)":/ig, '$1:');
  }
}
