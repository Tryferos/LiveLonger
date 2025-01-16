import {FC} from 'react';
import {Column} from '../../../components/elements/Column';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {
  RecentSearch,
  useRecentSearchesSelector,
} from '../../../store/recent_searches';
import {AppBorderRadius} from '../../../constants/values';
import {Spacer} from '../../../components/elements/Spacer';
import {useSearchProducts} from '../../../store/search_products';
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native';

export const RecentSearches = () => {
  const {recentSearches} = useRecentSearchesSelector();
  return (
    <Column gap="3xs">
      <CustomText font="wotfardMedium" size="lg" className="ml-2">
        {'🔎  Recent Searches'}
      </CustomText>
      <Spacer size="3xs" />
      {recentSearches.length > 1 ? (
        <ScrollView
          className=""
          horizontal={true}
          decelerationRate={0}
          snapToAlignment="start"
          snapToInterval={Dimensions.get('screen').width * 0.8}
          showsHorizontalScrollIndicator={false}>
          {recentSearches.map((recentSearch, i) => (
            <Row key={recentSearch.search + i} className="w-[70vw] mr-2">
              <RecentSearchesItem {...recentSearch} />
            </Row>
          ))}
        </ScrollView>
      ) : (
        recentSearches.length > 0 && (
          <Column className="w-[89vw]">
            <RecentSearchesItem {...recentSearches[0]} />
          </Column>
        )
      )}
    </Column>
  );
};

const RecentSearchesItem: FC<RecentSearch> = ({search, date}) => {
  const {setQuery} = useSearchProducts();
  const onPress = () => {
    setQuery(search);
  };
  return (
    <Row
      onPress={onPress}
      gap="xs"
      className={`items-center py-4 px-4 mb-4 w-full`}
      shadow="shadowMedium"
      backgroundColor="white"
      style={{borderRadius: AppBorderRadius.small}}>
      <CustomIcon icon="schedule" color="gray" size="sm" />
      <CustomText
        boxStyles={{flex: 1}}
        className="text-center flex-wrap"
        color="gray"
        font="wotfardRegular"
        size="sm">
        {search}
      </CustomText>
    </Row>
  );
};
