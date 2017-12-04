import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { Link } from 'core/components'
import { routes } from 'core/routes'
import { selectors as ClaimsSelectors } from 'domains/claims'
import {
  actions as IdentityActions,
  selectors as IdentitySelectors,
} from 'domains/identity'
import { selectors as SessionSelectors } from 'domains/session'

class Search extends Component {
  componentDidMount() {
    const { actions, routeParams } = this.props

    return actions.readIdentity(routeParams.id)
  }

  render() {
    const { claims, identity, isSessionAccount, routeParams } = this.props

    return (
      <div>
        <h2>Search</h2>
        <p>{routeParams.id}</p>
        {identity && <p>Ethereum Address: {identity.owner}</p>}
        {claims &&
          claims.map((claim, key) => (
            <Link key={key} to={`${routes.search.path}/${claim.username}`}>
              Claim verified by: {claim.issuer}
            </Link>
          ))}
        {isSessionAccount && (
          <Link to={`${routes.claim.path}/${routeParams.id}`}>
            <button>New Claim</button>
          </Link>
        )}
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({
    claims: ClaimsSelectors.claimsBySubject,
    identity: IdentitySelectors.identityById,
    isSessionAccount: SessionSelectors.isSessionAccount,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...IdentityActions }, dispatch),
  })
)(Search)