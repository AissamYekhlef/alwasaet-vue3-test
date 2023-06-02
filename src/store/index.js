const addOrRemove = (arr, item) => arr.includes(item) ? arr.filter((_item) => item !== _item) : [...arr, item]

const views = {
    archive: {
        getter: 'getArchivedEmails'
    },
    non_archive: {
        getter: 'getNonArchivedEmails'
    }
}

export default {
    namespaced: true,
    state: () => ({
            emails: [
                {id: 1, email: 'aissam11@gmail.com',title: 'Email title 11', content: 'here the content', archived: true, read_at: null}, 
                {id: 2, email: 'aissam22@gmail.com',title: 'Email title 22', content: 'here the content', archived: false, read_at: null}, 
                {id: 3, email: 'aissam33@gmail.com',title: 'Email title 33', content: 'here the content', archived: false, read_at: null}, 
                {id: 4, email: 'aissam44@gmail.com',title: 'Email title 44', content: 'here the content', archived: true, read_at: null},
                {id: 5, email: 'aissam55@gmail.com',title: 'Email title 55', content: 'here the content', archived: false, read_at: null}, 
                {id: 6, email: 'aissam66@gmail.com',title: 'Email title 66', content: 'here the content', archived: true, read_at: null},
            ],
            selectedEmailsIds: [], // number[]
            selectedEmail: null, // null | object
    }),
    mutations: {
        deleteEmail(state, emailId) {
            state.emails = emails.filter(({id}) => emailId !== id)
        },
        toggleSelectEmail(state, emailId) {
            state.selectedEmailsIds = addOrRemove(state.selectedEmailsIds, emailId) 
        },
        setSelectedEmail(state, emailId) {
            if (emailId) {
                const emailToSelect = state.emails.find(email => email.id === emailId)
                state.selectedEmail = emailToSelect || null
                state.selectedEmailsIds = state.selectedEmailsIds.find(_emailId => _emailId === emailId) ? state.selectedEmailsIds : [emailToSelect.id] 
            }else {
                state.selectedEmail = state.emails.find(email => email.id === emailId) || null
                // state.selectedEmailsIds = state.selectedEmailsIds.filter(email => email.id !== emailId)
            }
            console.log('selectedEmail: ', state.selectedEmail);
        },

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
        },
        isSelectedEmail(state) {
            return (emailId) => state.selectedEmailsIds.includes(emailId)
        },
        isAllSelectedEmails(state, getters) {
            return state.selectedEmailsIds.length === getters.getArchivedEmails.length
        },
        isReadEmail(state) {
            return emailId => {
                const email = state.emails.find(email => email.id === emailId)

                return email ? email.read_at !== null : false 
            }
        }

    },
    actions: {
        deleteEmail(ctx, payload) {
            ctx.commit('deleteEmail', {id: payload.id})

        },
        toggleAllSelectedEmails({state, getters}, view) {

            state.selectedEmailsIds = state.selectedEmailsIds.length === 0 ? [...getters[views[view].getter].map( ({id}) => id)] : [] 
        },
        markSelectedAsRead({state}) {
            state.emails.forEach(email => {
                if(state.selectedEmailsIds.includes(email.id)) {
                    email.read_at = new Date().toISOString().split('T').join(' ')
                }
            })
        },
        markSelectedAsUnread({state}) {
            state.emails.forEach(email => {
                if(state.selectedEmailsIds.includes(email.id)) {
                    email.read_at = null
                }
            })
        },
        

        archiveSelectedEmails({state}) {
            state.emails.forEach(email => {
                if(state.selectedEmailsIds.includes(email.id)) {
                    email.archived = true
                }
            })
        },
        resetSelectedEmails({state}) {
            state.selectedEmailsIds = []
        }

    },
}