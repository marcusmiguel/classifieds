|%
+$  action
  $%  
    [%publish-ad title=tape desc=tape forward=? price=tape images=(list @t)]
    :: update an ad identified by `id`
    :: `id` and `timestamp` cannot be modifed
    :: `~` will leave the original value unchanged
    ::
    $:  %edit-ad
      id=ad-id 
      title=(unit tape) 
      desc=(unit tape) 
      forward=(unit ?) 
      price=(unit tape)
      images=(unit (list @t))
    ==
    [%toggle-favorite id=ad-id]
    [%delete-ad id=ad-id]
    [%send-message advertisement-id=ad-id to=ship text=tape]
    [%receive-message advertisement-id=ad-id msg=msg]
  ==
:: TODO: change those tapes to @t?
::
+$  ad-id  @uv
+$  advertisement 
    $:
::    TODO: maybe the `ship` field should go: If
::    we keep the `publisher` field in `ad-catalog` it becomes  redundant
      =ship 
      id=ad-id
      date=@da 
      forward=? 
      title=tape 
      desc=tape 
      price=tape 
      images=(list @t)
    ==
:: An `ad-catalog` is a timestamped list of `advertisement`s.
:: The @da timestamp to makes it unique, otherwise gossip will not propagate this if we send the same list twice.
:: This is of particular importance for broadcasting empty lists of
:: `advertisement`s more than once (e.g. after an agent got `|nuke`d).
::
+$  ad-catalog  [publisher=ship timestamp=@da ads=(list advertisement)]  
+$  favorite     [id=ad-id]
+$  chat         [receiver=ship advertisement-id=ad-id msgs=(list msg)]
+$  msg          [ship=ship date=@da text=tape]
+$  state-0
  $:  %0
      ads=(map ship (list advertisement))
      myads=(list advertisement)
      favorites=(list favorite)
      chats=(list chat)
  ==
--  

