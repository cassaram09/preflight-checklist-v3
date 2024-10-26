import {classes} from '@/helpers/styles.helpers';
import styles from './Container.module.scss';

type ContainerProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
};

export default function Container({
  children,
  className = '',
}: ContainerProps): JSX.Element {
  const cl = classes(styles);
  return <div className={cl(['root', className])}>{children}</div>;
}
