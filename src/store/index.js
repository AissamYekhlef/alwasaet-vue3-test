export default {
    namespaced: true,
    state: () => ({
            emails: [
                {id: 1, email: 'aissam11@gmail.com',title: 'Email title', content: 'here the content', archived: true, read_at: null}, 
                {id: 2, email: 'aissam22@gmail.com',title: 'Email title', content: 'here the content', archived: false, read_at: null}, 
                {id: 3, email: 'aissam33@gmail.com',title: 'Email title', content: 'here the content', archived: false, read_at: null}, 
                {id: 4, email: 'aissam44@gmail.com',title: 'Email title', content: 'here the content', archived: true, read_at: null},
            ],
            selectedEmailsIds: [1, 3], // null | number[]
            selectedEmail: null, // null | object
    }),
    mutations: {
        deleteEmail(state, emailId) {
            state.emails = emails.filter(({id}) => emailId !== id)
        }

    },
    getters: {
        getArchivedEmails(state, getters) {
            return state.emails.filter((email) => {
                return email.archived
            })
        },
        
        getNonArchivedEmails(state, getters) {
            return state.emails.filter((email) => {
                return !email.archived
            })
        },
        
        getSelectedEmailsCount(state, getters) {
            return state.selectedEmailsIds ? state.selectedEmailsIds.length : 0  
        }

    },
    actions: {
        deleteEmail(ctx, payload) {
            ctx.commit('deleteEmail', {id: payload.id})

        }

    },
}