import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { CREATE_MESSAGE } from '../Mutations';
import { MESSAGES } from '../Queries';
import { NEW_MESSAGE_SUBSCRIPTION } from '../Subscriptions';

export default class Messages extends Component{
  subscribeToNewMessages(subscribeToMore){
    subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      updateQuery: (prev, {subscriptionData}) => {
        if(!subscriptionData) return prev;
        return Object.assign({}, prev, {
          messages: [...prev.messages, subscriptionData.data.newMessage]
        })
      }
    })
  }
  render() {
    return(
  <main>
    <h1>Messages</h1>
    <Mutation 
      mutation={CREATE_MESSAGE}
      update={(cache, {data}) =>{
        console.log(cache, data);
        const currentState = cache.readQuery({query: MESSAGES});
        const newState = [...currentState.messages, data.createMessage];
        cache.writeQuery({
          query: MESSAGES,
          data: {messages: newState}
        })
      }}>
      {createMessageLink => 
        <form onSubmit={e => {
          e.preventDefault();
          createMessageLink({variables: {message: e.currentTarget.message.value}});
        }}>
          <label>
            <input type="text" name="message" />
          </label>
          <button>Create Message</button>
        </form>
      }
    </Mutation>
    <Query query={MESSAGES}>
    {({loading, error, data, subscribeToMore}) => {
      if(loading) return <div>Loading...</div>
      if(error) return <div>Error {error.message}</div>
      //this.subscribeToNewMessages(subscribeToMore);
      return <div>
        <p>{data.messages.map(message => <p>{message.text}</p>)}</p>
      </div>
    }}
  </Query>
  </main>
  )
  }
}