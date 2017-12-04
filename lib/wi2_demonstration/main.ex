defmodule Wi2Demonstration.Main do
  alias Wi2Demonstration.Actions

  @pages ["waiting", "description", "experiment", "result"]
  @sequence ["question1", "question2", "answered"]

  def pages, do: @pages
  def sequence, do: @sequence

  def init do
    %{
      page: "waiting",
      participants: %{},
      joined: 0,
      answered: 0,
      oneone: 0,
      onetwo: 0,
      twoone: 0,
      twotwo: 0,
      question_text: nil,
        }
  end

  def new_participant(data) do
    %{
      question_text: data.question_text,
      sequence: "question1",
      question1: 0,
      question2: 0,
      active: true,
      joined: 1,
      qswap: false,
      oneone: data.oneone,
      onetwo: data.onetwo,
      twoone: data.twoone,
      twotwo: data.twotwo,
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant(data)
      new = new |> Map.put(:joined, Map.size(data.participants) + 1)
      data = data |> Map.put(:participants, Enum.into(Enum.map(data.participants, fn {id, map} ->
        {id, Map.put(map, :joined, Map.size(data.participants) + 1)}
      end), %{}))
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end
