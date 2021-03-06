import { identity } from 'meta.js'
import { createSelector } from 'reselect'

import { selectors as Claims } from 'domains/claims'
import { name } from './constants'

/**
 * Select the entire domain from the store by `name`
 *
 * @param  {Object} state Redux store
 * @return {Object}       Domain state
 */
const getAll = state => state.get(name)

/**
 * Get session account
 *
 * @type {Object}
 */
const getAccount = createSelector(getAll, state => {
  return state.get('account') && state.get('account').toObject()
})

/**
 * Get session account address
 *
 * @type {String}
 */
const getAccountAddress = createSelector(getAccount, account => {
  return account && account.address
})

/**
 * Check if active session account
 *
 * @type {Boolean}
 */
const getIsLoggedIn = createSelector(getAccount, account => {
  return Boolean(account)
})

/**
 * Get session account's claims graph name
 *
 * @type {Boolean}
 */
const getGraph = createSelector(getAll, state => {
  return state.get('graph')
})

/**
 * Get new user flag
 *
 * @type {Boolean}
 */
const getIsNewUser = createSelector(getAll, state => {
  return state.get('isNewUser')
})

/**
 * Get OAuth claim message
 *
 * @type {String}
 */
const getOAuthClaimMessage = createSelector(getAll, state => {
  return state.get('oAuthClaimMessage')
})

/**
 * Get META Claims Graph of session account
 *
 * @type {Object}
 */
const getSessionClaimsGraph = createSelector(
  [getGraph, Claims.claimsWithProfileData],
  (graph, claims) => {
    const sessionClaimsGraph = claims[graph]

    return sessionClaimsGraph
  }
)

/**
 * Get META Identity `id` of session account
 *
 * @type {Object}
 */
const getSessionIdentityId = createSelector(getGraph, graph => {
  return graph && identity.getIdFromUsername(graph)
})

export default {
  account: getAccount,
  accountAddress: getAccountAddress,
  isLoggedIn: getIsLoggedIn,
  graph: getGraph,
  isNewUser: getIsNewUser,
  oAuthClaimMessage: getOAuthClaimMessage,
  sessionClaimsGraph: getSessionClaimsGraph,
  sessionIdentityId: getSessionIdentityId,
}
