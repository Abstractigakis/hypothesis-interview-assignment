# Hypothesis Interview Take Home Assignment

Dear reviewers reading, given this is a small example, I have ommited typescrpit, and focused more on the explination of _why_ rather than how.

On second read through, I don't think that a feature like this can be implemented _production ready_ in just a few hours with all the bells and whistles, documetation and testing etc.  I also have a high standard of what production ready means.  Would love to have a talk about the SDLC.

We will start with a minimum viable product: i.e. the feature has all necessary functionality with very minimal styling.  We will omit nice transitions, svg animations, and other features that really sell the product at the end of the day.

## What is important

- [ ] Simple way to add users in comments (we will use a button)

## What is extra

- [ ] bold, Italics, ... mune (especially if we want to do it from scratch)
- [ ] Multi feature search (search username and the user's name based on input)
- [ ] add the 'wikilinks' effect for ever better UX
- [ ] make the user ref render as a nice badge
- [ ] smooth animated transitions to the form
- [ ] animated svg buttons

First thing to note, there is not very many in users in the list, so we will simply store it in memory, and just use the `filter` method, but this would not work at scale.  

## Scaling side tangent

for _fun_ we will consider possible scaling solutions:

1. Use a cache and suffix trie

We would have a seperate microservice which we would call each time the form updates.  This microservice may talk to a redis cache that has a suffix trie that represents all the users.  This would allow for $O(log(n))$ look ups, and is more compressed to send over the wire when the text input in the form changes.

2. WASM in memory db

Use WASM and use a portable in memory database, (there is a talk that some microft engineers demo a proof of concept for this.) I bring this up mostly because I belive hypothesis may need this for what they want to accomplish overall.

## Components

In effort to keep the code simple, and realzing the functionality of the assignment happens in one place, I don't immediatly see the _correct_ way to break up the components ahead of time, so I will build it spagheti code style, and then refactor as the abstractions become more clear

## Styling

Out of familiarity, I will use tailwindcss, but I am not married to it.

## testing

For Simplicity, I will use a few cypress tests rather than unit test libraties like jest and react testing library, since I am more comfortable, and I have had better testing experiences overall with this tool; I like the playback feature.  Again,  I'm not married to it.