import React, {FC, useEffect, useRef, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {CustomText} from '../../../components/elements/CustomText';
import {Row} from '../../../components/elements/Row';
import {Modal} from '../../../components/wrappers/ModalWrapper';
import {useSelectedProgram} from '../../../store/selected_program';
import {ProgramType, Programs} from '../../../types/settings';
import {ProgramCard} from './ProgramCard';
import {ProgramModal} from './ProgramModal';

type Props = {
  hideTitle?: boolean;
};

export const ProgramList: FC<Props> = ({hideTitle = false}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProgramModal, setSelectedProgramModal] = useState<
    Programs[ProgramType] | null
  >(null);
  const {
    programs,
    program: selectedProgram,
    selectProgram,
  } = useSelectedProgram();
  const onCardPress = (program: Programs[ProgramType]) => {
    setSelectedProgramModal(program);
    setIsVisible(true);
  };
  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  }, [scrollRef, selectedProgram]);
  return (
    <Column>
      {!hideTitle && (
        <CustomText font="wotfardMedium" size="lg">
          {'Programs'}
        </CustomText>
      )}
      <Row className="py-4 items-center">
        <ScrollView
          decelerationRate={0}
          snapToAlignment="start"
          snapToInterval={Dimensions.get('window').width * 0.8}
          ref={scrollRef}
          className="h-full"
          horizontal
          showsHorizontalScrollIndicator={false}>
          {programs &&
            Object.keys(programs)
              .sort((a, b) =>
                a === selectedProgram?.program
                  ? -1
                  : b.localeCompare(selectedProgram?.program ?? a),
              )
              .map((program, i) => (
                <ProgramCard
                  type={program as ProgramType}
                  key={program + i}
                  program={programs[program as ProgramType]}
                  selected={program === selectedProgram?.program}
                  onPress={() => onCardPress(programs[program as ProgramType])}
                />
              ))}
        </ScrollView>
      </Row>
      <Modal
        title={selectedProgramModal?.title ?? ''}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}>
        <ProgramModal
          isSelected={
            selectedProgramModal?.program === selectedProgram?.program
          }
          program={selectedProgramModal}
          onClose={() => setIsVisible(false)}
        />
      </Modal>
    </Column>
  );
};
