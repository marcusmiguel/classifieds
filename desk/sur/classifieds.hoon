|%
+$  action
  $%
    [%publish-ad title=tape desc=tape forward=? price=tape images=(list @t)]
    :: update an ad identified by `id`
    :: `id` and `timestamp` cannot be modifed
    :: `~` will leave the original value unchanged
    ::
    $:  %update-ad
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
+$  ad-id  @uvH
+$  advertisement 
    $:
      =ship 
      id=ad-id
      date=@da 
      forward=? 
      title=tape 
      desc=tape 
      price=tape 
      images=(list @t)
    ==
:: needs @da timestamp to make it unique, otherwise gossip will not propagate this if we send the same list twice.
::
+$  initial-ads  [timestamp=@da (list advertisement)]  
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

