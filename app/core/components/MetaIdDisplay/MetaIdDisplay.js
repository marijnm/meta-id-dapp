import React, { Fragment } from 'react'

import { META_ID_USERNAME_SUFFIX } from 'core/constants'
import { Span } from 'core/primitives'
import { metaId } from 'core/util'

const MetaIdDisplay = ({ username }) => (
  <Fragment>
    <Span>{metaId.getNameFromUsername(username)}</Span>
    <Span color="accent">{META_ID_USERNAME_SUFFIX}</Span>
  </Fragment>
)

export default MetaIdDisplay