const comments = [
    {post:'2', author:'3', id:'21', text:'vel beatae natus eveniet ratione temporibusdoloribus!'},
    {post:'2', author:'2', id:'26', text:'aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore '},
    {post:'2', author:'3', id:'38', text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae'},
    {post:'3', author:'1', id:'477', text:'lorem whooppyd doo lala zzz'}
]

const posts = [
    {id:'1', author:'1', title:'Joe', body:'lorem whooppyd doo lala qqq', published: true},
    {id:'2', author:'1', title:'Dick', body:'lorem whooppyd doo lala 444', published: true},
    {id:'3', author:'3', title:'Harry', body:'lorem whooppyd doo lala zzz', published: true}
]

const users = [
    {id:'1', name:'Joe', email:'user1@example.com'},
    {id:'2', name:'Dick', email:'user2@example.com', age: 89},
    {id:'3', name:'Harry', email:'user3@example.com'}
]

const db = {users, posts, comments}

export {db as default}
