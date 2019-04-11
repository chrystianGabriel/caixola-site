defmodule ExemploTest do
  use ExUnit.Case
  doctest Exemplo

  test "greets the world" do
    assert Exemplo.hello() == :world
  end
end
