import {Dimensions} from 'react-native';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {AppSpace} from '../../../constants/values';
import {AnimatedView} from 'react-native-reanimated/lib/typescript/reanimated2/component/View';

export const BottomFoods = () => {
  const foods = ['🥐', '🍔', '🍕', '🥩', '🍗', '🥬', '🌽', '🍄‍🟫', '🍪', '🍉'];
  const size = 20;
  const randomValues = new Array(size).fill(0).map((_, i) => ({
    left: 20 + ((i * 25) % (Dimensions.get('window').width * 1 - 40)),
    bottom: Math.random() * Dimensions.get('window').height * 0.8,
  }));
  return (
    <Row className="absolute bottom-0 h-[100%] w-full items-end justify-center -z-50">
      {new Array(size).fill(0).map((food, i) => (
        <CustomText
          key={i}
          font="wotfardMedium"
          size="lg"
          style={{
            ...randomValues[i % randomValues.length],
            transform: [{rotate: `${Math.random() * 45 - 90}deg`}],
          }}
          className="text-center absolute opacity-[0.3]"
          color="gray">
          {foods[i % foods.length]}
        </CustomText>
      ))}
    </Row>
  );
};
const generateRandomPositions = (count = 10) => {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const left = Math.random() * (Dimensions.get('window').width - 50); // 50 is an arbitrary icon size
    const bottom = Math.random() * Dimensions.get('window').height * 0.5; // Position within the bottom 200px of the screen

    positions.push({left, bottom});
  }
};
