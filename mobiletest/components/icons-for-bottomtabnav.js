,
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({focused, tintColor}) => {
      const {routeName} = navigation.state;
      if(routeName === 'Calculator') {
        return <Ionicons name='ios-calculator' size={25} color={tintColor} />;
        } else if(routeName === 'History') {
          return <Ionicons name='md-list' size={25} color={tintColor} />;            }
        }
      }
  )
}