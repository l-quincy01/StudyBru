import { Modal } from "../Components/Modals/Modal";

const CustomModal = ({
  setIsModalOpen,
  docPicker,
  subjectTitle,
  setsTitle,
  onSubjectTitleChange,
  onSetsTitleChange,
}) => {
  const [isSetsTitleValid, setIsSetsTitleValid] = useState(false);
  const [isSubjectTitleValid, setIsSubjectTitleValid] = useState(false);

  const handleSetsTitleInputChange = (text) => {
    onSetsTitleChange(text);
    setIsSetsTitleValid(text.length >= 3);
  };

  const handleSubjectTitleInputChange = (text) => {
    onSubjectTitleChange(text);
    setIsSubjectTitleValid(text.length >= 3);
  };

  return (
    <Modal isOpen={isModalOpen} withInput>
      <View style={tw`bg-white w-full p-4 rounded-xl flex-col gap-y-6`}>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`text-lg font-semibold`}>Create New Note Set</Text>
          <TouchableOpacity onPress={() => setIsModalOpen(false)}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-col gap-y-4`}>
          <View style={tw`flex flex-col gap-y-1`}>
            {isSetsTitleValid ? (
              <Text style={tw`text-md font-semibold text-gray-500`}>
                Title of Set
              </Text>
            ) : (
              <Text style={tw`text-md font-semibold text-red-500`}>
                At least 3 Characters
              </Text>
            )}
            <TextInput
              placeholder="Title Of Set. i.e Maths"
              value={setsTitle}
              onChangeText={handleSetsTitleInputChange}
              mode="outlined"
            />
          </View>
          <View style={tw`flex flex-col gap-y-1`}>
            {isSubjectTitleValid ? (
              <Text style={tw`text-md font-semibold text-gray-500`}>
                Title of Subject
              </Text>
            ) : (
              <Text style={tw`text-md font-semibold text-red-500`}>
                At least 3 Characters
              </Text>
            )}
            <TextInput
              placeholder="Title Of Subject. i.e Calculus"
              value={subjectTitle}
              onChangeText={handleSubjectTitleInputChange}
              mode="outlined"
            />
          </View>
          <Text style={tw`text-gray-500 text-md font-light `}>
            * Title of your notes will be automatically generated
          </Text>
          <TouchableOpacity
            style={[
              tw`rounded-2xl items-center gap-3 justify-center flex flex-row p-5`,
              isSetsTitleValid && isSubjectTitleValid
                ? tw`bg-black`
                : tw`bg-gray-400`,
            ]}
            onPress={docPicker}
            disabled={!isSetsTitleValid || !isSubjectTitleValid}
          >
            <Text style={tw`text-white`}>Select document to finish</Text>
            <Ionicons name="cloud-upload-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default CustomModal;
