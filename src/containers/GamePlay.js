import { connect } from 'react-redux';
import Game from '../components/Game';

const mapStateToProps = state => ({
  game:state.game
});

export default connect(mapStateToProps)(Game);
