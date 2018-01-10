import { NODE_ENV } from 'core/constants'
import * as accounts from './eth-accounts'
import * as metaId from './meta-id'
import * as spotify from './spotify'

export { accounts, metaId, spotify }

/**
 * Check for development mode
 *
 * @type {Boolean}
 */
export const isDevelopment = NODE_ENV === 'development'

/**
 * Check if action belongs to a domain
 *
 * @param  {String}  domain     Redux store domain
 * @param  {String}  actionType Redux action type
 * @return {Boolean}            isDomainAction
 */
export const isDomainAction = (domain, actionType) =>
  actionType.indexOf(domain) === 0

/**
 * Check if async action has failed
 *
 * @param  {Object}  action Flux Standard Action
 * @return {Boolean}        hasAsyncActionFailed
 */
export const hasAsyncActionFailed = action =>
  action.meta && action.meta['redux-pack/LIFECYCLE'] === 'failure'

/**
 * Check if async action has started
 *
 * @param  {Object}  action Flux Standard Action
 * @return {Boolean}        hasAsyncActionStarted
 */
export const hasAsyncActionStarted = action =>
  action.meta && action.meta['redux-pack/LIFECYCLE'] === 'start'

/**
 * Check if async action has succeeded
 *
 * @param  {Object}  action Flux Standard Action
 * @return {Boolean}        hasAsyncActionSucceeded
 */
export const hasAsyncActionSucceeded = action =>
  action.meta && action.meta['redux-pack/LIFECYCLE'] === 'success'

export const readFileAsText = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = ({ target: { error, result } }) =>
      error ? reject(error) : resolve(result)

    reader.readAsText(file)
  })

/**
 * Capitalise each word in a string
 *
 * @param  {String} str String to capitalise
 * @return {String}     Capitalised string
 */
export const toCapitalised = str => str.replace(/\b\w/g, l => l.toUpperCase())
