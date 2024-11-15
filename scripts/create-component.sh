SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

P=${2:-.}

OUTPUT_DIR=$SCRIPT_DIR/../$P/$1

mkdir $OUTPUT_DIR || exit

cat << EOF > $OUTPUT_DIR/$1.tsx
import { classes } from '@/helpers/styles.helpers';
import styles from './$1.module.scss';

export type $1Props = unknown;

export default function $1({}: $1Props): JSX.Element {
  const cl = classes(styles);

  return <div className={cl('root')}>$1</div>;
}
EOF

cat << EOF > $OUTPUT_DIR/$1.module.scss
.root {
  display: block;
}
EOF

cat << EOF > $OUTPUT_DIR/$1.spec.tsx
import {render} from 'test';
import $1 from './$1';

describe('$1', () => {
  it('renders', async () => {
    throw new Error('You need to write a test for this component!');
  });
});
EOF

echo "export {default as $1} from './$1/$1';" >> $OUTPUT_DIR/../index.ts

echo "Created component in $OUTPUT_DIR"