import { connect } from 'umi';
import Mask from '../Mask';

const mapState2Props = (state: { loading: { global: boolean; }; }) => ({
  isLoading: state.loading.global,
});

export default connect(mapState2Props, null)(Mask);
