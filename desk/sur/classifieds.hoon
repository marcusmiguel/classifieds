|%
+$  action
  $%
    [%publish-ad title=tape desc=tape forward=? price=tape images=(list @t)]
    [%toggle-favorite id=@uv]
    [%delete-ad id=@uv]
  ==
:: TODO: change those tapes to @t?
::
+$  advertisement 
    $:
      =ship 
      id=@uvH 
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
+$  ad-catalog  [timestamp=@da (list advertisement)]  
+$  favorite  [id=@uvH]
+$  state-0
  $:  %0
      ads=(map ship (list advertisement))
      myads=(list advertisement)
      favorites=(list favorite)
  ==
--  

