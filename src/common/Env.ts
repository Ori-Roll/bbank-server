import jetEnv, { num } from 'jet-env';

import { isEnumVal } from '@src/util/miscValidators';
import { NodeEnvs } from './constants';

export default jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
  Port: num,
});
